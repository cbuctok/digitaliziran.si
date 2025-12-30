# Digitaliziran.si Hugo Site

This is a Hugo-based static website for Digitaliziran.si that automatically deploys to GitHub Pages.

## Development

### Prerequisites
- Hugo (extended version recommended)
- Python 3.x

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/digitaliziran.si.git
   cd digitaliziran.si
   ```

2. Install Hugo (if not already installed):
   ```bash
   # On macOS
   brew install hugo
   
   # Or download from https://gohugo.io/installation/
   ```

3. Run the development server:
   ```bash
   hugo server -D
   ```

4. The site will be available at `http://localhost:1313`

### Building

Use the provided build script:
```bash
./build.sh
```

This will:
- Run the markdown linter
- Build the Hugo site
- Output to the `public/` directory

### Markdown Linting

The project includes a custom markdown linter that checks for:
- WordPress comments
- Proper header spacing
- List formatting
- Orphaned HTML tags
- Trailing whitespace
- Code block formatting

Run it manually:
```bash
python3 lint_markdown.py content --fix
```

## Deployment

The site is automatically deployed to GitHub Pages on every push to the `master` branch.

### GitHub Pages Setup

1. The GitHub Actions workflow (`.github/workflows/deploy.yml`) handles:
   - Checking out the repository
   - Setting up Hugo
   - Running markdown linting
   - Building the site
   - Deploying to the `gh-pages` branch

2. To configure GitHub Pages:
   - Go to your repository Settings > Pages
   - Set the source to `gh-pages` branch
   - Set the folder to `/ (root)`
   - Save

### Custom Domain (Optional)

If you want to use a custom domain:
1. Add a `CNAME` file in the `static/` directory with your domain
2. Configure DNS to point to GitHub Pages
3. Update the `baseURL` in `hugo.toml`

## Project Structure

- `content/` - Markdown content files
- `layouts/` - Custom templates
- `static/` - Static assets (CSS, JS, images)
- `themes/` - Hugo themes
- `public/` - Generated static site (built output)
- `hugo.toml` - Hugo configuration
- `build.sh` - Build script
- `lint_markdown.py` - Markdown linter

## License

This project is [REUSE 3.3](https://reuse.software/spec-3.3/) compliant with dual licensing:

- **Content** (posts, documentation, images): [CC-BY-4.0](LICENSES/CC-BY-4.0.txt)
- **Code** (scripts, templates, CSS, JS): [MIT](LICENSES/MIT.txt)

See `REUSE.toml` for detailed file-to-license mapping.
