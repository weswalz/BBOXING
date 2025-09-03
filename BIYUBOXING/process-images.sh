#!/bin/bash

# Process all images from pending folder to public/images as WebP 85%
echo "Starting image processing..."

# Process About Us images
echo "Processing About Us images..."
cwebp -q 85 pending/aboutus/images/aboutusfeature.jpg -o public/images/aboutusfeature.webp
cwebp -q 85 pending/aboutus/images/aboutushero.jpg -o public/images/aboutushero.webp
cwebp -q 85 pending/aboutus/images/dominican-republic-boxing.jpg -o public/images/dominican-republic-boxing.webp
cwebp -q 85 pending/aboutus/images/ourexperience.jpg -o public/images/ourexperience.webp
cwebp -q 85 pending/aboutus/images/ourpartners.jpg -o public/images/ourpartners.webp

# Process Box for Us images
echo "Processing Box for Us images..."
cwebp -q 85 pending/boxforus/images/boxforushero.png -o public/images/boxforushero.webp
cwebp -q 85 pending/boxforus/images/careerbackground.png -o public/images/careerbackground.webp

# Process Contact images
echo "Processing Contact images..."
cwebp -q 85 pending/contact/images/contactushero.jpg -o public/images/contactushero.webp
cwebp -q 85 pending/contact/images/jointheviplist.jpg -o public/images/jointheviplist.webp
cwebp -q 85 pending/contact/images/sendusamessagebackground.png -o public/images/sendusamessagebackground.webp
cwebp -q 85 pending/contact/images/unnamed\(021\).png -o public/images/contacticon.webp

# Process Fighter images
echo "Processing Fighter images..."
cwebp -q 85 pending/fighters/images/ChavonStillwell.png -o public/images/ChavonStillwell.webp
cwebp -q 85 pending/fighters/images/ElieselRodriguezLedesma.png -o public/images/ElieselRodriguezLedesma.webp
cwebp -q 85 pending/fighters/images/ErickRosado.png -o public/images/ErickRosado.webp
cwebp -q 85 pending/fighters/images/EridsonGarcia.png -o public/images/EridsonGarcia.webp
cwebp -q 85 pending/fighters/images/MarquisTaylor.png -o public/images/MarquisTaylor.webp
cwebp -q 85 pending/fighters/images/MichaelChaiseNelson.png -o public/images/MichaelChaiseNelson.webp
cwebp -q 85 pending/fighters/images/RafaelAbreu.png -o public/images/RafaelAbreu.webp
cwebp -q 85 pending/fighters/images/DRflag.png -o public/images/DRflag.webp
cwebp -q 85 pending/fighters/images/USAflag.png -o public/images/USAflag.webp
cwebp -q 85 pending/fighters/images/boxforusbg.png -o public/images/boxforusbg.webp
cwebp -q 85 pending/fighters/images/ourfighershero.png -o public/images/ourfighershero.webp

# Process News images
echo "Processing News images..."
cwebp -q 85 pending/news/images/ChavonStillwell.jpeg -o public/images/ChavonStillwell-news.webp
cwebp -q 85 pending/news/images/biyutrio.jpg -o public/images/biyutrio.webp
cwebp -q 85 pending/news/images/boxforus.png -o public/images/boxforus-news.webp
cwebp -q 85 pending/news/images/garciaready.jpg -o public/images/garciaready.webp
cwebp -q 85 pending/news/images/newshero.png -o public/images/newshero.webp
cwebp -q 85 pending/news/images/treblesuccess.jpeg -o public/images/treblesuccess.webp

# Process Past Events images
echo "Processing Past Events images..."
cwebp -q 85 pending/pastevents/images/biyubrawlapril26th.jpg -o public/images/biyubrawlapril26th.webp
cwebp -q 85 pending/pastevents/images/fightforus.png -o public/images/fightforus.webp
cwebp -q 85 pending/pastevents/images/previouseventshero.png -o public/images/previouseventshero.webp
cwebp -q 85 pending/pastevents/images/torresjuly3rd.jpg -o public/images/torresjuly3rd.webp

# Process Upcoming Events images
echo "Processing Upcoming Events images..."
cwebp -q 85 pending/upcomingevents/images/boxforus.png -o public/images/boxforus-events.webp
cwebp -q 85 pending/upcomingevents/images/glovesandglory.jpg -o public/images/glovesandglory.webp
cwebp -q 85 pending/upcomingevents/images/upcomingeventshero.png -o public/images/upcomingeventshero.webp

# Process screenshot images (page previews)
echo "Processing screenshot images..."
cwebp -q 85 pending/aboutus.png -o public/images/aboutus-screenshot.webp
cwebp -q 85 pending/boxforus.png -o public/images/boxforus-screenshot.webp
cwebp -q 85 pending/contactus.png -o public/images/contactus-screenshot.webp
cwebp -q 85 pending/fighters.png -o public/images/fighters-screenshot.webp
cwebp -q 85 pending/news.png -o public/images/news-screenshot.webp
cwebp -q 85 pending/previousevents.png -o public/images/previousevents-screenshot.webp
cwebp -q 85 pending/upcomingevents.png -o public/images/upcomingevents-screenshot.webp

echo "Image processing complete!"
echo "All images converted to WebP at 85% quality and moved to public/images/"