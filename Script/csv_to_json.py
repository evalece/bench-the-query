import csv
import json
import os
# Dev Priority: mid low
# Automation #Script #CLI
# For later: this allows user to parse valid csv data;
def csv_to_json(csv_filename_original, json_filename, csv_filename, n):
    # Read from the original CSV
    with open(csv_filename_original, mode='r', newline='', encoding='utf-8') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        data = [row for i, row in enumerate(csv_reader) if i < n]

        
    # Write to file, assume csv is orignal
    with open(json_filename, mode='w') as jsonwriter:    
        json.dump(data, jsonwriter, indent=4)
   
    with open(csv_filename, mode='w', newline='', encoding='utf-8') as csv_file: #GPT assisted 
        writer = csv.DictWriter(csv_file, fieldnames=data[0].keys())
        writer.writeheader()
        writer.writerows(data)

     
    
        

csv_filename = '../app/Data/df_final_features.csv'  # Path to the input CSV file
json50_filename = '../app/Data/df_final_features10.json'  # Path to the output JSON file
csv50_filename = '../app/Data/df_final_features10.csv'  # Path to the output JSON file


csv_to_json(csv_filename, json50_filename, csv50_filename, 10)