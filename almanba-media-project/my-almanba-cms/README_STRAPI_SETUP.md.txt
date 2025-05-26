# Strapi Backend Setup for Al-Manba Media

## 1. Create a new Strapi project:
npx create-strapi-app@latest my-almanba-cms --quickstart
# Or using yarn:
# yarn create strapi-app my-almanba-cms --quickstart

cd my-almanba-cms

## 2. Create an Admin User:
The --quickstart command will open your browser to http://localhost:1337/admin. Create your first administrator account.

## 3. Create an "Article" Content Type:
In the Strapi admin panel, go to Content-Type Builder -> + Create new collection type.
- Display name: Article (Singular: Article, Plural: Articles)
- Click Continue.
- Add the following fields:
    - title: Type Text (Short text), select Required field.
    - slug: Type UID, select Attach to field: title, select Required field. This will be used for URLs.
    - content: Type Rich Text (Markdown editor).
    - excerpt: Type Text (Long text).
    - published_at: Type DateTime. (Strapi has built-in publishedAt if you use draft/publish system, but explicit field can be useful).
    - featuredImage: Type Media (Single media).
    - (Optional) author: Type Relation, relation with User (from: users-permissions). Choose Article has one User.
    - (Optional) category: Type Relation, relation with a new Category content type you might create.
- Click Save, then Finish. Strapi will restart.

## 4. Set Permissions for Public Access:
- Go to Settings -> Roles (under Users & Permissions Plugin) -> Public.
- Scroll down to Permissions.
- Find Article and check the boxes for find (to get all articles) and findOne (to get a single article by ID or slug).
- Click Save.

## 5. Add Some Sample Articles:
- Go to Content Manager -> Article -> + Create new entry.
- Fill in the details for a few sample articles and Publish them. Make sure to upload a featured image for at least one.

## Run Strapi (if not already running):
npm run develop
# Or using yarn:
# yarn develop

Your Strapi API will be available at http://localhost:1337.
Articles endpoint: http://localhost:1337/api/articles
To include relations like featuredImage, use populate:
http://localhost:1337/api/articles?populate=*