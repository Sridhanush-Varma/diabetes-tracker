import * as XLSX from 'xlsx';
import Papa from 'papaparse';

// Define the expected structure of a glucose record from a spreadsheet
export interface ImportedGlucoseRecord {
  date: string;
  time_of_day: 'Breakfast' | 'Lunch' | 'Dinner';
  glucose_level: number;
  food_description: string;
}

// Define the result of the import process
export interface ImportResult {
  success: boolean;
  totalRecords: number;
  importedRecords: number;
  updatedRecords: number;
  errors: string[];
  records: ImportedGlucoseRecord[];
}

/**
 * Parse an Excel file and extract glucose records
 */
export const parseExcelFile = (file: File): Promise<ImportedGlucoseRecord[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Assume the first sheet contains the data
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        // Transform and validate the data
        const records = transformSpreadsheetData(jsonData);
        resolve(records);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        reject(new Error(`Failed to parse Excel file: ${errorMessage}`));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read the file'));
    };
    
    reader.readAsArrayBuffer(file);
  });
};

/**
 * Parse a CSV file and extract glucose records
 */
export const parseCsvFile = (file: File): Promise<ImportedGlucoseRecord[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        try {
          const records = transformSpreadsheetData(results.data);
          resolve(records);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
          reject(new Error(`Failed to parse CSV file: ${errorMessage}`));
        }
      },
      error: (error) => {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        reject(new Error(`Failed to parse CSV file: ${errorMessage}`));
      }
    });
  });
};

/**
 * Transform and validate raw spreadsheet data into glucose records
 */
export const transformSpreadsheetData = (data: any[]): ImportedGlucoseRecord[] => {
  const records: ImportedGlucoseRecord[] = [];
  const errors: string[] = [];
  
  data.forEach((row, index) => {
    try {
      // Try to extract fields using different possible column names
      const date = row.date || row.Date || row['Date (YYYY-MM-DD)'] || '';
      const timeOfDay = row.time_of_day || row['Time of Day'] || row.TimeOfDay || row.Meal || '';
      const glucoseLevel = parseFloat(row.glucose_level || row['Glucose Level'] || row.GlucoseLevel || row.Glucose || '0');
      const foodDescription = row.food_description || row['Food Description'] || row.FoodDescription || row.Food || '';
      
      // Validate the data
      if (!date) {
        throw new Error('Missing date');
      }
      
      // Normalize time of day
      let normalizedTimeOfDay: 'Breakfast' | 'Lunch' | 'Dinner';
      const timeOfDayLower = timeOfDay.toLowerCase();
      
      if (timeOfDayLower.includes('break') || timeOfDayLower.includes('morning')) {
        normalizedTimeOfDay = 'Breakfast';
      } else if (timeOfDayLower.includes('lunch') || timeOfDayLower.includes('noon')) {
        normalizedTimeOfDay = 'Lunch';
      } else if (timeOfDayLower.includes('dinner') || timeOfDayLower.includes('evening')) {
        normalizedTimeOfDay = 'Dinner';
      } else {
        throw new Error('Invalid time of day. Must be Breakfast, Lunch, or Dinner');
      }
      
      if (isNaN(glucoseLevel) || glucoseLevel <= 0) {
        throw new Error('Invalid glucose level');
      }
      
      // Format the date to ensure it's in YYYY-MM-DD format
      const formattedDate = formatDate(date);
      
      records.push({
        date: formattedDate,
        time_of_day: normalizedTimeOfDay,
        glucose_level: glucoseLevel,
        food_description: foodDescription || ''
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      errors.push(`Row ${index + 1}: ${errorMessage}`);
    }
  });
  
  if (errors.length > 0) {
    console.error('Errors during import:', errors);
  }
  
  return records;
};

/**
 * Format a date string to ensure it's in YYYY-MM-DD format
 */
export const formatDate = (dateStr: string): string => {
  // Try to parse the date
  const date = new Date(dateStr);
  
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date format');
  }
  
  // Format as YYYY-MM-DD
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

/**
 * Determine the file type and parse accordingly
 */
export const parseImportFile = async (file: File): Promise<ImportedGlucoseRecord[]> => {
  const fileType = file.name.split('.').pop()?.toLowerCase();
  
  if (fileType === 'xlsx' || fileType === 'xls') {
    return parseExcelFile(file);
  } else if (fileType === 'csv') {
    return parseCsvFile(file);
  } else {
    throw new Error('Unsupported file type. Please upload an Excel (.xlsx, .xls) or CSV (.csv) file.');
  }
};
