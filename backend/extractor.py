# Extractor module for parsing PDFs and scraping URLs
import fitz # PyMuPDF
import requests
from bs4 import BeautifulSoup
import os

def extract_pdf_content(file_path: str, output_image_dir: str = "temp_images"):
    """
    Extracts text and reference images from a given PDF file.
    Saves images to output_image_dir and returns text and list of image paths.
    """
    if not os.path.exists(output_image_dir):
        os.makedirs(output_image_dir)
        
    doc = fitz.open(file_path)
    full_text = ""
    extracted_images = []
    
    for i in range(len(doc)):
        page = doc[i]
        full_text += page.get_text() + "\n"
        
        image_list = page.get_images()
        for img_index, img in enumerate(image_list):
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            
            image_filename = os.path.join(output_image_dir, f"page{i+1}_img{img_index}.{image_ext}")
            with open(image_filename, "wb") as f:
                f.write(image_bytes)
                
            extracted_images.append({
                "fig_id": f"Page {i+1} Figure {img_index}",
                "image_path": image_filename
            })
            
    return {"text": full_text, "figures": extracted_images}

def scrape_google_patents(url: str):
    """
    Scrapes a Google Patents URL to find the patent text and images.
    """
    # Placeholder for actual complex scraping. Returns raw text for now.
    try:
        response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Google Patents usually has a <section itemprop="description"> or <div class="claims">
        claims_section = soup.find('section', itemprop='claims')
        desc_section = soup.find('section', itemprop='description')
        
        text = ""
        if claims_section:
            text += claims_section.get_text(separator='\n') + "\n"
        if desc_section:
            text += desc_section.get_text(separator='\n') + "\n"
            
        if not text:
            # Fallback to all text
            text = soup.get_text(separator='\n')
            
        return {"text": text, "figures": []} # Images scraping from Google Patents requires specific logic or API
    except Exception as e:
        print(f"Failed to scrape Google Patents: {e}")
        return {"text": "", "figures": []}
