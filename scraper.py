# scraper.py
from scholarly import scholarly

def get_scholar_publications(author_name):
    try:
        search_query = scholarly.search_author(author_name)
        author = next(search_query, None)

        if not author:
            print(f"No author found for: {author_name}")
            return []

        author_filled = scholarly.fill(author)  # only once
        publications = author_filled.get("publications", [])

        pub_list = []

        for pub in publications[:4]:
            bib = pub.get("bib", {})
            pub_list.append({
                "title": bib.get("title", "No title"),
                "year": bib.get("pub_year", "N/A"),
                "venue": bib.get("venue", "Unknown"),
                "link": "https://scholar.google.com"  # Or skip this
            })

        return pub_list

    except Exception as e:
        print("Error fetching publications:", e)
        return []
