import os
import urllib.request
import zipfile
import shutil

def download():
    zip_url = "https://archive.ics.uci.edu/static/public/73/mushroom.zip"
    zip_filename = "mushroom.zip"
    extract_member = "agaricus-lepiota.data"
    renamed_filename = "mushrooms.csv"
    temp_extract_dir = "temp_extracted"
    destination_directory = "../dataset/"
    headers = "class,cap-shape,cap-surface,cap-color,bruises,odor,gill-attachment,gill-spacing,gill-size,gill-color,stalk-shape,stalk-root,stalk-surface-above-ring,stalk-surface-below-ring,stalk-color-above-ring,stalk-color-below-ring,veil-type,veil-color,ring-number,ring-type,spore-print-color,population,habitat\n"

    print("Downloading zip...")
    urllib.request.urlretrieve(zip_url, zip_filename)

    print("Extracting data...")
    os.makedirs(temp_extract_dir, exist_ok=True)
    with zipfile.ZipFile(zip_filename, 'r') as zip_ref:
        zip_ref.extract(extract_member, temp_extract_dir)
    original_file_path = os.path.join(temp_extract_dir, extract_member)
    renamed_file_path = os.path.join(temp_extract_dir, renamed_filename)

    print("Adding headers...")
    with open(original_file_path, 'r') as infile, open(renamed_file_path, 'w') as outfile:
        outfile.write(headers)
        shutil.copyfileobj(infile, outfile)
    os.makedirs(destination_directory, exist_ok=True)

    print("Moving dataset...")
    shutil.move(renamed_file_path, os.path.join(destination_directory, renamed_filename))

    print("Cleaning up...")
    os.remove(zip_filename)
    shutil.rmtree(temp_extract_dir)
    
    print("Dataset ready!")