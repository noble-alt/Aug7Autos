from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://localhost:8080")
    time.sleep(3) # wait for page to load
    page.screenshot(path="jules-scratch/verification/screenshot.png")
    browser.close()