import csv
import json
import os

def csv_to_json(csv_filename, json_filename):
    
    with open(csv_filename, mode='r') as csv_file:
        csv_reader = csv.DictReader(csv_file)     
        data = [row for row in csv_reader]
        
    # Write the JSON file
    with open(json_filename, mode='w') as json_file:
        json.dump(data, json_file, indent=4)

csv_filename = '../app/Data/df_final_features.csv'  # Path to the input CSV file
json_filename = '../app/Data/df_final_features.json'  # Path to the output JSON file


csv_to_json(csv_filename, json_filename)