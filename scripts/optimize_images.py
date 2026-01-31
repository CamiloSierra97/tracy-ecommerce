import os
from PIL import Image
from pillow_heif import register_heif_opener

register_heif_opener()

def optimize_images(directory):
    supported_formats = ('.jpg', '.jpeg', '.png', '.heic', '.HEIC', '.JPG', '.JPEG', '.PNG')
    
    # Walk through the directory
    for root, dirs, files in os.walk(directory):
        for filename in files:
            if filename.lower().endswith(supported_formats):
                # Skip already optimized files to avoid double processing or loops
                if '-optimized' in filename:
                    continue
                
                filepath = os.path.join(root, filename)
                name, ext = os.path.splitext(filename)
                new_filename = f"{name}-optimized.webp"
                new_filepath = os.path.join(root, new_filename)
                
                try:
                    with Image.open(filepath) as img:
                        # Convert to RGB if necessary (e.g. for PNGs with alpha or HEIC)
                        if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                             # Keep transparency for WEBP
                             pass
                        else:
                             img = img.convert('RGB')
                        
                        print(f"Converting {filename} to {new_filename}...")
                        img.save(new_filepath, 'WEBP', quality=80)
                        print(f"Saved: {new_filename}")
                except Exception as e:
                    print(f"Error converting {filename}: {e}")

if __name__ == "__main__":
    target_dir = os.path.join(os.getcwd(), 'public', 'DB')
    if os.path.exists(target_dir):
        print(f"Scanning {target_dir}...")
        optimize_images(target_dir)
        print("Done.")
    else:
        print(f"Directory not found: {target_dir}")
