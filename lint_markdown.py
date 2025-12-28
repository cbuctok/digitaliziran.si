#!/usr/bin/env python3
"""Lint and auto-fix Markdown files for Hugo."""

import argparse
import re
import sys
from pathlib import Path


class MarkdownLinter:
    """Linter for Hugo markdown files."""

    def __init__(self, fix=False):
        self.fix = fix
        self.issues = []

    def lint_file(self, filepath):
        """Lint a single markdown file."""
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        original = content
        file_issues = []

        # Check for WordPress comments
        wp_comments = re.findall(r'<!--\s*/?wp:[^>]*-->', content)
        if wp_comments:
            file_issues.append(f"WordPress comments found: {len(wp_comments)}")
            if self.fix:
                content = re.sub(r'<!--\s*/?wp:[^>]*-->', '', content)

        # Check for headers without blank line after
        bad_headers = re.findall(r'^(#{1,6} [^\n]+)\n[^\n#]', content, re.MULTILINE)
        if bad_headers:
            file_issues.append(f"Headers without blank line after: {len(bad_headers)}")
            if self.fix:
                content = re.sub(r'^(#{1,6} [^\n]+)\n([^\n#])', r'\1\n\n\2', content, flags=re.MULTILINE)

        # Check for list items with leading whitespace (tabs or multiple spaces)
        bad_lists = re.findall(r'^[ \t]+- ', content, re.MULTILINE)
        if bad_lists:
            file_issues.append(f"List items with leading whitespace: {len(bad_lists)}")
            if self.fix:
                content = re.sub(r'^[ \t]+(- )', r'\1', content, flags=re.MULTILINE)

        # Check for orphaned HTML tags (common ones)
        orphan_tags = re.findall(r'<(div|span|section|article)[^>]*>|</(div|span|section|article)>', content)
        if orphan_tags:
            file_issues.append(f"Orphaned HTML tags: {len(orphan_tags)}")
            if self.fix:
                content = re.sub(r'<(div|span|section|article)[^>]*>', '', content)
                content = re.sub(r'</(div|span|section|article)>', '', content)

        # Check for multiple consecutive blank lines (more than 2)
        multi_blanks = re.findall(r'\n{4,}', content)
        if multi_blanks:
            file_issues.append(f"Multiple consecutive blank lines: {len(multi_blanks)}")
            if self.fix:
                content = re.sub(r'\n{3,}', '\n\n', content)

        # Check for trailing whitespace
        trailing_ws = re.findall(r'[ \t]+$', content, re.MULTILINE)
        if trailing_ws:
            file_issues.append(f"Lines with trailing whitespace: {len(trailing_ws)}")
            if self.fix:
                content = re.sub(r'[ \t]+$', '', content, flags=re.MULTILINE)

        # Check for missing blank line before headers
        missing_before = re.findall(r'[^\n]\n#{1,6} ', content)
        if missing_before:
            file_issues.append(f"Headers without blank line before: {len(missing_before)}")
            if self.fix:
                content = re.sub(r'([^\n])\n(#{1,6} )', r'\1\n\n\2', content)

        # Check for code blocks not properly separated
        bad_code = re.findall(r'[^\n]```', content)
        if bad_code:
            file_issues.append(f"Code blocks without preceding blank line: {len(bad_code)}")
            if self.fix:
                content = re.sub(r'([^\n])(\n```)', r'\1\n\2', content)

        # Save if fixed
        if self.fix and content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

        if file_issues:
            self.issues.append((filepath, file_issues))

        return len(file_issues) == 0

    def lint_directory(self, directory):
        """Lint all markdown files in a directory."""
        path = Path(directory)
        md_files = list(path.rglob('*.md'))

        clean = 0
        dirty = 0

        for md_file in md_files:
            # Skip _index.md files
            if md_file.name == '_index.md':
                continue

            if self.lint_file(md_file):
                clean += 1
            else:
                dirty += 1

        return clean, dirty

    def report(self):
        """Print linting report."""
        if not self.issues:
            print("✓ All files are clean!")
            return 0

        print(f"Found issues in {len(self.issues)} file(s):\n")
        for filepath, file_issues in self.issues:
            print(f"  {filepath}")
            for issue in file_issues:
                print(f"    - {issue}")
        print()

        if self.fix:
            print("✓ Issues have been auto-fixed.")
            return 0
        else:
            print("Run with --fix to auto-fix these issues.")
            return 1


def main():
    parser = argparse.ArgumentParser(description='Lint Hugo markdown files')
    parser.add_argument('path', nargs='?', default='content',
                        help='Path to lint (default: content)')
    parser.add_argument('--fix', action='store_true',
                        help='Auto-fix issues')
    args = parser.parse_args()

    linter = MarkdownLinter(fix=args.fix)

    path = Path(args.path)
    if path.is_file():
        linter.lint_file(path)
    else:
        clean, dirty = linter.lint_directory(path)
        print(f"Checked {clean + dirty} files: {clean} clean, {dirty} with issues\n")

    return linter.report()


if __name__ == '__main__':
    sys.exit(main())
