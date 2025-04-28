from scholarly import scholarly

def get_scholar_publications(author_name):
    try:
        search_query = scholarly.search_author(author_name)
        author = next(search_query, None)

        if not author:
            print(f"No author found for: {author_name}")
            return []

        author_filled = scholarly.fill(author)  # Fill author details
        publications = author_filled.get("publications", [])

        pub_list = []

        for pub in publications[:4]:
            try:
                filled_pub = scholarly.fill(pub)
                bib = filled_pub.get("bib", {})
                pub_url = filled_pub.get("pub_url", None)

                pub_list.append({
                    "title": bib.get("title", "No title"),
                    "year": bib.get("pub_year", "N/A"),
                    "venue": bib.get("venue", "Unknown"),
                    "link": pub_url if pub_url else "https://scholar.google.com"
                })
            except Exception as pub_error:
                print("Error filling publication details:", pub_error)

        return pub_list

    except Exception as e:
        print("Error fetching publications:", e)
        return []
