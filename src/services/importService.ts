import { supabase } from '@/utils/supabase';
import { ImportedGlucoseRecord, ImportResult } from '@/utils/importUtils';

/**
 * Import glucose records into the database
 */
export const importGlucoseRecords = async (
  userId: string,
  records: ImportedGlucoseRecord[]
): Promise<ImportResult> => {
  const result: ImportResult = {
    success: true,
    totalRecords: records.length,
    importedRecords: 0,
    updatedRecords: 0,
    errors: [],
    records: []
  };

  if (records.length === 0) {
    result.success = false;
    result.errors.push('No valid records found to import');
    return result;
  }

  // Process records in batches to avoid hitting API limits
  const batchSize = 50;
  const batches = [];

  for (let i = 0; i < records.length; i += batchSize) {
    batches.push(records.slice(i, i + batchSize));
  }

  for (const batch of batches) {
    try {
      // For each record in the batch, check if it already exists
      for (const record of batch) {
        try {
          // Check if a record with the same date, time_of_day, and user_id exists
          const { data: existingRecords, error: fetchError } = await supabase
            .from('glucose_records')
            .select('id')
            .eq('user_id', userId)
            .eq('date', record.date)
            .eq('time_of_day', record.time_of_day);

          if (fetchError) {
            throw new Error(`Error checking for existing record: ${fetchError.message}`);
          }

          if (existingRecords && existingRecords.length > 0) {
            // Update the existing record
            const { error: updateError } = await supabase
              .from('glucose_records')
              .update({
                glucose_level: record.glucose_level,
                food_description: record.food_description,
                updated_at: new Date().toISOString()
              })
              .eq('id', existingRecords[0].id);

            if (updateError) {
              throw new Error(`Error updating record: ${updateError.message}`);
            }

            result.updatedRecords++;
          } else {
            // Insert a new record
            const { error: insertError } = await supabase
              .from('glucose_records')
              .insert({
                user_id: userId,
                date: record.date,
                time_of_day: record.time_of_day,
                glucose_level: record.glucose_level,
                food_description: record.food_description
              });

            if (insertError) {
              throw new Error(`Error inserting record: ${insertError.message}`);
            }

            result.importedRecords++;
          }

          // Add the successfully processed record to the result
          result.records.push(record);
        } catch (error) {
          result.records.push(record);
          const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
          result.errors.push(`Error processing record (${record.date}, ${record.time_of_day}): ${errorMessage}`);
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      result.errors.push(`Error processing batch: ${errorMessage}`);
    }
  }

  // If we have any errors but also some successful imports, still consider it a partial success
  if (result.errors.length > 0 && (result.importedRecords > 0 || result.updatedRecords > 0)) {
    result.success = true; // Partial success
  } else if (result.errors.length > 0) {
    result.success = false;
  }

  return result;
};

/**
 * Generate a template for glucose records import
 */
export const generateImportTemplate = (): { headers: string[], sampleData: any[] } => {
  const headers = ['Date', 'Time of Day', 'Glucose Level', 'Food Description'];
  
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const formatDateForSample = (date: Date): string => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };
  
  const sampleData = [
    {
      'Date': formatDateForSample(today),
      'Time of Day': 'Breakfast',
      'Glucose Level': 120,
      'Food Description': 'Oatmeal with berries and a cup of coffee'
    },
    {
      'Date': formatDateForSample(today),
      'Time of Day': 'Lunch',
      'Glucose Level': 110,
      'Food Description': 'Grilled chicken salad with olive oil dressing'
    },
    {
      'Date': formatDateForSample(yesterday),
      'Time of Day': 'Dinner',
      'Glucose Level': 130,
      'Food Description': 'Salmon with steamed vegetables and brown rice'
    }
  ];
  
  return { headers, sampleData };
};
