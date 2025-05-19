import json
import os
from flask import current_app

def load_publications():
    """
    Load and combine publication data from multiple sources:
    - Manually maintained journals and conferences
    - Scraped Google Scholar data
    Returns unified dictionary with publications categorized by type.
    """
    # Initialize data structure
    data = {
        'journals': {},
        'conferences': {},
        'scholar': []
    }

    # Load manual journal entries
    try:
        with open(os.path.join(current_app.root_path, 'data', 'manual_journals.json'), 'r', encoding='utf-8') as f:
            data['journals'] = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError, UnicodeDecodeError) as e:
        current_app.logger.error(f"Error loading manual journals: {str(e)}")

    # Load manual conference entries
    try:
        with open(os.path.join(current_app.root_path, 'data', 'manual_conferences.json'), 'r', encoding='utf-8') as f:
            data['conferences'] = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError, UnicodeDecodeError) as e:
        current_app.logger.error(f"Error loading manual conferences: {str(e)}")

    # Load and merge scraped Google Scholar data
    try:
        with open(os.path.join(current_app.root_path, 'data', 'scholar.json'), 'r', encoding='utf-8') as f:
            scholar_data = json.load(f)
            
            # Store raw scholar publications
            data['scholar'] = scholar_data.get('all_publications', [])
            
            # Merge scholar journals with manual entries
            for year, pubs in scholar_data.get('journals', {}).items():
                if year not in data['journals']:
                    data['journals'][year] = []
                data['journals'][year].extend(pubs)
            
            # Merge scholar conferences with manual entries
            for year, pubs in scholar_data.get('conferences', {}).items():
                if year not in data['conferences']:
                    data['conferences'][year] = []
                data['conferences'][year].extend(pubs)
                
    except (FileNotFoundError, json.JSONDecodeError, UnicodeDecodeError) as e:
        current_app.logger.error(f"Error loading scholar data: {str(e)}")

    return data