import os
from PIL import Image, ImageDraw, ImageFont, ImageEnhance

def create_og_posters():
    # 1. Load the original promo asset poster
    asset_path = "public/images/aset-landing-page.png"
    if not os.path.exists(asset_path):
        print("Asset not found!")
        return

    poster = Image.open(asset_path).convert("RGB")

    # Define dimensions
    w_banner, h_banner = 1200, 630
    w_square, h_square = 1080, 1080

    # ----------------------------------------------------
    # BUILD 1200x630 LANDSCAPE OG BANNER (WhatsApp & Facebook)
    # ----------------------------------------------------
    banner = Image.new("RGB", (w_banner, h_banner), "#7F1D1D") # Deep red background
    draw_b = ImageDraw.Draw(banner)

    # Gradient background from dark crimson #7F1D1D to deep purple-red #4C0519
    for y in range(h_banner):
        r = int(127 - (127 - 76) * (y / h_banner))
        g = int(29 - (29 - 5) * (y / h_banner))
        b = int(29 - (29 - 25) * (y / h_banner))
        draw_b.line([(0, y), (w_banner, y)], fill=(r, g, b))

    # Resize poster to fit right side of banner
    # Poster height = 630, calculate width proportionally
    aspect = poster.width / poster.height
    new_h = 630
    new_w = int(630 * aspect)
    poster_resized = poster.resize((new_w, new_h), Image.Resampling.LANCZOS)

    # Paste poster on the right half (from x=570 to 1200)
    banner.paste(poster_resized, (w_banner - new_w, 0))

    # Add gradient overlay on left to blend seamlessly
    gradient_overlay = Image.new("RGBA", (300, 630), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(gradient_overlay)
    for x in range(300):
        alpha = int(255 * (1 - (x / 300)))
        g_draw.line([(x, 0), (x, 630)], fill=(127, 29, 29, alpha))
    banner.paste(gradient_overlay, (w_banner - new_w - 50, 0), gradient_overlay)

    # Re-draw text over left side
    font_bold_path = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
    font_reg_path = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"

    font_h1 = ImageFont.truetype(font_bold_path, 42)
    font_h2 = ImageFont.truetype(font_bold_path, 26)
    font_body = ImageFont.truetype(font_reg_path, 20)
    font_badge = ImageFont.truetype(font_bold_path, 18)
    font_price = ImageFont.truetype(font_bold_path, 54)

    # Left content box
    draw_b = ImageDraw.Draw(banner)

    # Badge Top Left
    draw_b.rounded_rectangle([50, 45, 520, 85], radius=20, fill="#FFFFFF")
    draw_b.text((70, 54), "🇮🇩 PROMO HUT RI KE-81 — CUKUP BAYAR 81%", fill="#DC2626", font=font_badge)

    # Brand & Title
    draw_b.text((50, 110), "CREATIVEMU ACADEMY", fill="#FDE047", font=font_h2) # Yellow accent
    draw_b.text((50, 155), "Bootcamp Laravel\nWeb Developer", fill="#FFFFFF", font=font_h1)

    # Description
    draw_b.text((50, 275), "Akselerasi 3 Bulan Siap Kerja.\n3 Project Portfolio Production-Grade.", fill="#F3F4F6", font=font_body)

    # Big 81% Highlight Box
    draw_b.rounded_rectangle([50, 360, 520, 520], radius=16, fill="#991B1B", outline="#FCA5A5", width=2)
    draw_b.text((70, 375), "HANYA BAYAR", fill="#FECACA", font=font_h2)
    draw_b.text((70, 415), "81%", fill="#FFFFFF", font=font_price)
    draw_b.text((210, 435), "Kode: MERDEKA81\n(Diskon Spesial 19%)", fill="#FDE047", font=font_body)

    # Domain
    draw_b.text((50, 555), "laravel.creativemuacademy.com", fill="#67E8F9", font=font_h2)

    # Save 1200x630 files (< 150 KB)
    out_banner_jpg = "public/images/og-banner.jpg"
    banner.save(out_banner_jpg, "JPEG", quality=90, optimize=True)
    banner.save("public/og-image.jpg", "JPEG", quality=90, optimize=True)
    banner.save("public/opengraph-image.jpg", "JPEG", quality=90, optimize=True)
    banner.save("public/opengraph-image.png", "PNG", optimize=True)

    # ----------------------------------------------------
    # BUILD 1080x1080 SQUARE POSTER (Alternative WhatsApp Card)
    # ----------------------------------------------------
    square_poster = poster.resize((1080, 1080), Image.Resampling.LANCZOS)
    out_square_jpg = "public/images/og-square.jpg"
    square_poster.save(out_square_jpg, "JPEG", quality=88, optimize=True)

    print("All OG Posters created successfully!")
    print(f"Banner JPEG size: {os.path.getsize(out_banner_jpg) / 1024:.2f} KB")
    print(f"Square JPEG size: {os.path.getsize(out_square_jpg) / 1024:.2f} KB")

if __name__ == "__main__":
    create_og_posters()
