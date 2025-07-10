#!/bin/bash

# Create partner-logos directory if it doesn't exist
mkdir -p public/partner-logos

echo "🏢 Downloading Partner Logos for Sahara Developers..."
echo "================================================"

# Banking Partners
echo -e "\n📦 Banking Partners:"

# State Bank of India
echo "- Downloading SBI logo..."
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/SBI-logo.svg/2560px-SBI-logo.svg.png" -o public/partner-logos/sbi-logo.png

# HDFC Bank
echo "- Downloading HDFC Bank logo..."
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/2560px-HDFC_Bank_Logo.svg.png" -o public/partner-logos/hdfc-bank-logo.png

# ICICI Bank
echo "- Downloading ICICI Bank logo..."
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/ICICI_Bank_Logo.svg/2560px-ICICI_Bank_Logo.svg.png" -o public/partner-logos/icici-bank-logo.png

# Axis Bank
echo "- Downloading Axis Bank logo..."
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Axis_Bank_logo.svg/2560px-Axis_Bank_logo.svg.png" -o public/partner-logos/axis-bank-logo.png

# Punjab National Bank
echo "- Downloading PNB logo..."
curl -L "https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Punjab_National_Bank_logo.svg/2560px-Punjab_National_Bank_logo.svg.png" -o public/partner-logos/pnb-logo.png

# Bank of Baroda
echo "- Downloading Bank of Baroda logo..."
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Bank_of_Baroda_Logo.svg/2560px-Bank_of_Baroda_Logo.svg.png" -o public/partner-logos/bob-logo.png

# Kotak Mahindra Bank
echo "- Downloading Kotak logo..."
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Kotak_Mahindra_Bank_logo.svg/2560px-Kotak_Mahindra_Bank_logo.svg.png" -o public/partner-logos/kotak-logo.png

# Canara Bank
echo "- Downloading Canara Bank logo..."
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Canara_Bank_Logo.svg/2560px-Canara_Bank_Logo.svg.png" -o public/partner-logos/canara-bank-logo.png

# Material Partners
echo -e "\n🏗️ Material Partners:"

# UltraTech Cement
echo "- Downloading UltraTech logo..."
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/UltraTech_Cement_Logo.svg/2560px-UltraTech_Cement_Logo.svg.png" -o public/partner-logos/ultratech-logo.png

# Asian Paints
echo "- Downloading Asian Paints logo..."
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Asian_Paints_Logo.svg/2560px-Asian_Paints_Logo.svg.png" -o public/partner-logos/asian-paints-logo.png

# Berger Paints
echo "- Downloading Berger Paints logo..."
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Berger_Paints.svg/2560px-Berger_Paints.svg.png" -o public/partner-logos/berger-paints-logo.png

# Tata Steel
echo "- Downloading Tata Steel logo..."
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Tata_Steel_Logo.svg/2560px-Tata_Steel_Logo.svg.png" -o public/partner-logos/tata-steel-logo.png

# ACC Cement
echo "- Downloading ACC logo..."
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/ACC_Limited_Logo.svg/2560px-ACC_Limited_Logo.svg.png" -o public/partner-logos/acc-logo.png

echo -e "\n⚠️  Note: Some logos could not be downloaded automatically:"
echo "- Kajaria Ceramics"
echo "- Jindal Steel"
echo "- Somany Ceramics"
echo "These need to be downloaded manually from their official websites."

echo -e "\n✅ Download complete! Check the public/partner-logos directory."
echo "📝 Remember to optimize the images using tools like:"
echo "   - TinyPNG (https://tinypng.com)"
echo "   - ImageOptim (https://imageoptim.com)"
echo "   - Squoosh (https://squoosh.app)"