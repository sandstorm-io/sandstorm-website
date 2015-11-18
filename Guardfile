# A Guardfile, used to configure the tool "guard" to re-run Jekyll and live-reload the web site
# any time a source file is changed.

ignore /\.autosave$/

guard 'livereload' do
  watch(%r{^_site/})
end

guard 'jekyll-plus', :serve => true do
  watch(%r{^(?!_site/)})
end
