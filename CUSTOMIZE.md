# How to update the site

Personal content is stored in `_data`. In normal use, HTML editing is unnecessary.

- `profile.yml`: name, biography, photo and academic links.
- `education.yml`: education and academic positions.
- `research.yml`: research description and topics.
- `affiliations.yml`: institutional affiliations.
- `publications.yml`: research in progress and future publications.
- `teaching.yml`: courses and teaching experience.
- `contact.yml`: public email address.
- `languages.yml`: available languages and default language.
- `navigation.yml`: menu links.
- `theme.yml`: light and dark colors.
- `design.yml`: typography, spacing and layout.

Translated entries use `en`, `pt` and `es`, or the suffixes `_en`, `_pt` and `_es`. Keep all three translations synchronized and preserve YAML indentation.

To replace the profile photo, add the new image to `assets/fotos/` and update `photo` in `_data/profile.yml`.
