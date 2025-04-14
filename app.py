from flask import Flask, render_template
from flask import send_from_directory

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html", active_page='home')

@app.route('/projects')
def projects():
    return render_template("projects.html", projects=PROJECTS, active_page='projects')


@app.route('/protected/<path:filename>')
def protected_files(filename):
    return send_from_directory(
        'secure_docs',  
        filename,
        as_attachment=True  
    )

PROJECTS = [
    {
        "id": "quantum-computing",
        "title": "Artificial Intelligence Based Techniques",
        "status": "ongoing",
        "year": "2023-Present",
        "funding": " Rs. 20,40, 240/-",
        "description": "Design and Development of Agriculture-Artificial Intelligence Based Techniques for Saffron Production in India",
        "image": "slide1.jpg",
        "team": ["Ranjeet Kumar Rout"],
        "tags": ["Artificial Intelligence", "ML"],
        "patent": False,
        "patent_no": "",
        "sponsored": True,
        "sponsored_by": "DST iHub - IIT ROPAR"
    },
    {
        "id": "ai-healthcare",
        "title": "Analysis and prediction of disease-relevant mutations",
        "status": "completed",
        "year": "2020-2022",
        "funding": " Rs. 3,00,000/- ",
        "description": "Deep learning models for lung cancer detection...",
        "image": "ai-medicine.jpg",
        "team": ["Ranjeet Kumar Rout"],
        "tags": ["Computer Vision", "Medical AI"],
        "sponsored": True,
        "sponsored_by": "TEQIP-III"

    },
    {
        "id": "ai-healthcare",
        "title": "Action Plan for Municipal Solid Waste Management",
        "status": "completed",
        "year": "2020-2022",
        "funding": " Rs. 7,80,000/-",
        "description": "Action Plan for Municipal Solid Waste Management for the City of Srinagar using Machine Learning Identification and Segregation",
        "image": "ai-medicine.jpg",
        "team": ["Ranjeet Kumar Rout"],
        "tags": ["Computer Vision", "Medical AI"],
        "sponsored": True,
        "sponsored_by": "JKST&IC,  DST, J&K"
        
    },
    {
        "id": "ai-healthcare",
        "title": "facial emotion recognition",
        "status": "completed",
        "year": "2021",
        "funding": "",
        "description": "Implementation of facial emotion recognition system using deep neural network approaches and its application",
        "image": "ai-medicine.jpg",
        "team": ["Ranjeet Kumar Rout, Saiyed Umer, and Amrit Lal Sangal"],
        "tags": ["Deep neural network"],
        "patent": True,
        "patent_no": "202111012711",
        "sponsored": False,
        "sponsored_by": ""
        
    },
    {
        "id": "ai-healthcare",
        "title": "Systems and methods for facilitating biometric recognition",
        "status": "completed",
        "year": "2020-2022",
        "funding": "",
        "description": "Systems and methods for facilitating biometric recognition.(United States, Granted)",
        "documents": [{"name": "Research Paper", "url": "/static/docs/DOC1.pdf", "icon": "file-pdf"}],
        "image": "ai-medicine.jpg",
        "team": ["Muhammad Khurram Khan, Saiyed Umer, Ranjeet Kumar Rout, Alamgir Sardar"],
        "tags": ["Computer Vision", "Medical AI"],
        "patent": True,
        "patent_no": "US11762969B1",
        "sponsored": False,
        "sponsored_by": "JKST&IC,  DST, J&K"
        
    },
    {
        "id": "ai-healthcare",
        "title": "A Recommendation System And Method For E-commerce Using Machine Learning",
        "status": "completed",
        "year": "",
        "funding": " ",
        "description": "A Recommendation System And Method For E-commerce Using Machine Learning",
        "image": "ai-medicine.jpg",
        "team": ["Rout, Ranjeet Kumar; Umer, Saiyed; Sahoo, Ratikanta; Acharya, Biswaranjan ,Ranga"],
        "tags": ["Machine Learning"],
        "patent": True,
        "patent_no": "Australian Patent Number:2021106572",
        "sponsored": False,
        "sponsored_by": ""
        
    },
    {
        "id": "ai-Ecommerce",
        "title": "Affine Boolean Function for 16 Queen Problem",
        "status": "completed",
        "year": "2021",
        "funding": "",
        "description": "Implementation of Affine Boolean Function for 16 Queen Problem and Its Application",
        "image": "ai-medicine.jpg",
        "team": ["Ranjeet Kumar Rout, Saiyed Umer, Sabha Sheikh, Harveeer Singh Pali and Ratikanta Sahoo"],
        "tags": ["Artificial Intelligence", "Machine Learning"],
        "patent": True,
        "patent_no": "202111035066",
        "sponsored": False,
        "sponsored_by": ""
        
    },
    {
        "id": "dryer",
        "title": "SOLAR DRYER",
        "status": "completed",
        "year": "2021-2022",
        "funding": "",
        "description": "AN ECO-FRIENDLY LOW COST HYBRID SOLAR DRYER FOR DRYING VEGETABLES AND FRUITS",
        "image": "ai-medicine.jpg",
        "team": ["H. S Pali, Ranjeet Kumar Rout, Saiyed Umer and Ratikanta Sahoo"],
        "tags": ["Computer Vision", "Medical AI"],
        "patent": True,
        "patent_no": "2202111055051",
        "sponsored": False,
        "sponsored_by": ""
        
    },

]

PUBLICATIONS = [
    {
        "type": "journal",
        "title": "Quantum Neural Networks for Molecular Property Prediction",
        "authors": "Smith, J., Zhang, L., Kumar, R.",
        "journal": "Nature Quantum Information",
        "year": 2023,
        "doi": "10.1038/s41534-023-00710-z",
        "pdf": "qnn-paper.pdf"
    }
]

BOOKS = [
    {
        "title": "Advanced Quantum Algorithms",
        "publisher": "Springer",
        "year": 2023,
        "cover": "quantum-book.jpg",
        "link": "https://link.springer.com/quantum-algorithms"
    }
]

@app.route('/publications')
def publications():
    return render_template('publications.html', publications=PUBLICATIONS, active_page='publications')

@app.route('/books')
def books():
    return render_template('books.html', books=BOOKS, active_page='books')


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

@app.route('/talks-writings')
def talks_writings():
    return render_template("talks_writings.html", active_page='talks_writings')

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
