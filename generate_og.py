import os
from PIL import Image, ImageDraw, ImageFont

def create_og_banner():
    width = 1200
    height = 630

    # Create image with deep indigo background
    img = Image.new("RGB", (width, height), "#0B0F19")
    draw = ImageDraw.Draw(img)

    # Draw gradient background manually
    for y in range(height):
        # Interpolate from deep dark slate #0B0F19 (y=0) to purple/indigo #2E1065 (y=height)
        r = int(11 + (46 - 11) * (y / height))
        g = int(15 + (16 - 15) * (y / height))
        b = int(25 + (101 - 25) * (y / height))
        draw.line([(0, y), (width, y)], fill=(r, g, b))

    # Add radial glow at center top
    glow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    for radius in range(400, 0, -10):
        alpha = int(35 * (radius / 400))
        glow_draw.ellipse(
            [600 - radius * 1.5, 100 - radius, 600 + radius * 1.5, 100 + radius],
            fill=(147, 51, 234, alpha)
        )
    img.paste(glow, (0, 0), glow)

    # Fonts
    font_bold_path = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
    font_reg_path = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"

    font_title = ImageFont.truetype(font_bold_path, 46)
    font_sub = ImageFont.truetype(font_bold_path, 26)
    font_body = ImageFont.truetype(font_reg_path, 22)
    font_badge = ImageFont.truetype(font_bold_path, 20)
    font_domain = ImageFont.truetype(font_bold_path, 22)

    # Re-instantiate draw for RGB
    draw = ImageDraw.Draw(img)

    # 1. Top HUT RI Promo Badge (Red & White Theme)
    badge_x = 80
    badge_y = 55
    badge_w = 480
    badge_h = 42
    draw.rounded_rectangle(
        [badge_x, badge_y, badge_x + badge_w, badge_y + badge_h],
        radius=21,
        fill="#DC2626", # Crimson red
        outline="#EF4444",
        width=2
    )
    draw.text(
        (badge_x + 20, badge_y + 9),
        "PROMO SPESIAL HUT RI KE-81 — CUKUP BAYAR 81%",
        fill="#FFFFFF",
        font=font_badge
    )

    # 2. Brand Name / Subtitle Header
    draw.text(
        (80, 125),
        "CREATIVEMU ACADEMY — BATCH 1",
        fill="#A855F7", # Purple-400
        font=font_sub
    )

    # 3. Main Title
    draw.text(
        (80, 175),
        "Bootcamp Laravel Web Developer",
        fill="#FFFFFF",
        font=font_title
    )

    # 4. Description Line 1 & Line 2
    draw.text(
        (80, 250),
        "Program Akselerasi 3 Bulan Siap Kerja. Bangun 3 Proyek Portfolio Real",
        fill="#E2E8F0",
        font=font_body
    )
    draw.text(
        (80, 285),
        "Production-Grade & Dapatkan Career Support Selamanya.",
        fill="#CBD5E1",
        font=font_body
    )

    # 5. Benefit Pills / Stack (3 Box items)
    benefits = [
        " 3 Proyek Portfolio Real",
        " 1-on-1 Mentoring",
        " Support Karir & Hiring"
    ]
    px = 80
    py = 350
    for ben in benefits:
        bbox = font_body.getbbox(ben)
        bw = bbox[2] - bbox[0] + 30
        draw.rounded_rectangle([px, py, px + bw, py + 46], radius=12, fill="#1E293B", outline="#334155", width=2)
        draw.text((px + 15, py + 10), ben, fill="#F8FAFC", font=font_body)
        px += bw + 15

    # 6. Voucher Highlight Box
    v_box_x = 80
    v_box_y = 430
    v_box_w = 1040
    v_box_h = 75
    draw.rounded_rectangle(
        [v_box_x, v_box_y, v_box_x + v_box_w, v_box_y + v_box_h],
        radius=16,
        fill="#18181B",
        outline="#A855F7",
        width=2
    )
    draw.text((v_box_x + 25, v_box_y + 22), "Gunakan Kode Voucher:", fill="#9CA3AF", font=font_body)
    
    # White code pill
    draw.rounded_rectangle([v_box_x + 280, v_box_y + 15, v_box_x + 480, v_box_y + 60], radius=8, fill="#FFFFFF")
    draw.text((v_box_x + 300, v_box_y + 21), "MERDEKA81", fill="#DC2626", font=font_sub)

    draw.text((v_box_x + 510, v_box_y + 24), "(Otomatis Potongan — Hanya Bayar 81%!)", fill="#FACC15", font=font_body)

    # 7. Bottom Footer / Domain URL
    draw.line([(80, 545), (1120, 545)], fill="#334155", width=1)
    draw.text((80, 565), "laravel.creativemuacademy.com", fill="#38BDF8", font=font_domain)
    draw.text((820, 565), "Daftar & Amankan Slot Sekarang ->", fill="#94A3B8", font=font_body)

    # Ensure output directories exist
    os.makedirs("public/images", exist_ok=True)

    # Save as JPEG (Quality 90) for ultra-fast WhatsApp preview (< 150 KB)
    output_jpg = "public/images/og-banner.jpg"
    img.save(output_jpg, "JPEG", quality=90, optimize=True)
    
    # Also save as root opengraph-image.png (and opengraph-image.jpg)
    img.save("public/og-image.jpg", "JPEG", quality=90, optimize=True)
    img.save("public/opengraph-image.jpg", "JPEG", quality=90, optimize=True)
    img.save("public/opengraph-image.png", "PNG", optimize=True)

    print("OG Banner generated successfully!")
    print(f"File size: {os.path.getsize(output_jpg) / 1024:.2f} KB")

if __name__ == "__main__":
    create_og_banner()
