from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        page.goto("http://localhost:3000")

        # Fill and submit the form to add a new product
        page.get_by_placeholder("نام کالا").fill("مداد رنگی")
        page.get_by_placeholder("موجودی").fill("100")
        page.get_by_placeholder("قیمت خرید").fill("5000")
        page.get_by_placeholder("قیمت فروش").fill("7000")
        page.get_by_role("button", name="افزودن کالا").click()

        # Wait for the new product to appear in the table
        new_product_row = page.get_by_role("row").filter(has_text="مداد رنگی")
        expect(new_product_row).to_be_visible()

        # Take a screenshot
        page.screenshot(path="jules-scratch/verification/verification.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)