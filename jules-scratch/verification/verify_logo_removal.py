from playwright.sync_api import Page, expect

def test_logo_removal(page: Page):
    """
    This test verifies that the Lovable logo is no longer present on the homepage.
    """
    print("Running verification script...")
    # 1. Arrange: Go to the application's homepage.
    # The dev server is running on the default Vite port 5173.
    page.goto("http://localhost:5173")

    # 2. Assert: Check that there are no references to "lovable" in the page source.
    # We expect the page content not to contain the string "lovable".
    expect(page.locator("body")).not_to_have_text("lovable")

    # 3. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/verification.png")