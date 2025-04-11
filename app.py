from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html", active_page='home')

@app.route('/research')
def research():
    return render_template("research.html", active_page='research')

@app.route('/projects')
def projects():
    return render_template("projects.html", active_page='projects')

@app.route('/responsibilities')
def responsibilities():
    return render_template("responsibilities.html", active_page='responsibilities')

@app.route('/people')
def people():
    return render_template("people.html", active_page='people')

@app.route('/contact')
def contact():
    return render_template("contact.html", active_page='contact')

@app.route('/news')
def news():
    news_items = [
        {
            "image": "news1.jpg",
            "date": "June 15, 2023",
            "title": "New Research Published",
            "excerpt": "Our quantum computing paper accepted in Nature...",
            "full_text": "Detailed findings show breakthrough in..."
        }
        # Add more items
    ]
    
    announcements = [
        "Paper submission deadline: July 30",
        "New lab equipment arrived"
    ]
    
    return render_template('news.html', 
                         news_items=news_items,
                         announcements=announcements,
                         active_page='news')  # For active nav highlighting

if __name__ == '__main__':
    app.run(debug=True)
