import urllib.request
import re

url = "https://www.orbitwallet.in/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    # Find the footer link for Privacy Policy
    matches = re.findall(r'<a[^>]*href=["\'](.*?)["\'][^>]*>Privacy Policy', html, re.IGNORECASE)
    print("Link found:", matches)
except Exception as e:
    print("Error:", e)
