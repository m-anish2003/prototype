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
    people = [
        {
            "name": "Venkata  Mahalakshmi",
            "title": "( 2019PHSCSE005 )",
            "degree": "Ph.D.",
            "institution": "Rensselaer Polytechnic Institute",
            "interests": ["E-Health Care System"],
            "image": "avatar.webp"
        },
        {
            "name": "Amardeep Gupta",
            "title": " ( 2019PHSCSE006 ) ",
            "degree": "Ph.D.",
            "institution": "Rensselaer Polytechnic Institute",
            "interests": ["Meta-Huristic algorithms for Energy Harvesting in WSN"],
            "image": "avatar.webp"
        },
        {
            "name": "Nazir Shabbir ",
            "title": " ( 2019PHSCSE008 )",
            "degree": "Ph.D.",
            "institution": "Rensselaer Polytechnic Institute",
            "interests": [" Affective Computing", "Object Detection"],
            "image": "avatar.webp"
        },
        {
            "name": "Irfan Rashid  Pukhta",
            "title": "( 2019PHSCSE012 ) ",
            "degree": "Ph.D.",
            "institution": "Rensselaer Polytechnic Institute",
            "interests": ["Classification/Detection essential genes from microarray data"],
            "image": "avatar.webp"
        },
        {
            "name": "Monika Khandelwal",
            "title": "( 2021PHACSE001 )",
            "degree": "Ph.D.",
            "institution": "Rensselaer Polytechnic Institute",
            "interests": ["Artificial Intelligence/Machine Learning in Computational Biology"],
            "image": "avatar_girl.png"
        },
        {
            "name": "Ishrat Nazir",
            "title": "( 2023PHSCSE00 )",
            "degree": "Ph.D.",
            "institution": "Rensselaer Polytechnic Institute",
            "interests": ["Artificial Intelligence/Machine Learning in Computational Biology"],
            "image": "avatar.webp"
        },
        {
            "name": "Parveen kumar",
            "title": "",
            "degree": "M.Tech",
            "institution": "Rensselaer Polytechnic Institute",
            "interests": ["Reconstruction of DNA Sequence using Cellular Automata for Identification of Features"],
            "image": "avatar.webp"
        },
        {
            "name": "Jaiprakash Dhakar",
            "title": "",
            "degree": "M.Tech",
            "institution": "Rensselaer Polytechnic Institute",
            "interests": ["A Pattern Classification Model for vowel data using Fuzzy Nearest Neighbor"],
            "image": "avatar.webp"
        },
        {
            "name": "Pranay Sakhare",
            "title": "",
            "degree": "M.Tech",
            "institution": "Rensselaer Polytechnic Institute",
            "interests": ["Identification of Olfactory Receptors using a Parametric model"],
            "image": "avatar.webp"
        },
        {
            "name": " Shubham Jain ",
            "title": "",
            "degree": "M.Tech",
            "institution": "Rensselaer Polytechnic Institute",
            "interests": ["A Competent Algorithm to Detect Attractors in Gene Regulatory Networks (GRNs) Based On Divide and Conquer"],
            "image": "avatar.webp"
        },
        {
            "name": "Santosh Punase  ",
            "title": "",
            "degree": "M.Tech",
            "institution": "Rensselaer Polytechnic Institute",
            "interests": ["Identification of singleton attractors of Boolean Network using graph isomorphism"],
            "image": "avatar.webp"
        },
        {
            "name": "Sagar Mal Nitharwal",
            "title": "",
            "degree": "M.Tech",
            "institution": "Rensselaer Polytechnic Institute",
            "interests": ["A Boolean Based Multi –Secret Image Sharing scheme using bit-reversa"],
            "image": "avatar.webp"
        },
        # Add more as needed
    ]
    return render_template("people.html", people=people, active_page='people')

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
            "full_text": "Detailed findings show breakthrough in quantum entanglement simulation using novel qubit architecture."
        }
    ]

    announcements = [
        "Paper submission deadline: July 30",
        "New lab equipment arrived"
    ]


    return render_template('news.html', 
                           news_items=news_items,
                           announcements=announcements,
                           active_page='news')

if __name__ == '__main__':
    app.run(debug=True)
