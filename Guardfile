# A Guardfile, used to configure the tool "guard" to re-run Jekyll and live-reload the web site
# any time a source file is changed.

ignore /\.autosave$/

guard 'livereload' do
  watch(%r{^_site/})
end

guard 'jekyll-plus', :serve => true, :host => '0.0.0.0' do
  watch(%r{^(?!_site/)})
end
