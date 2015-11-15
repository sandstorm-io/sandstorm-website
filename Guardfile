# A Guardfile, used to configure the tool "guard" to re-run Jekyll and live-reload the web site
# any time a source file is changed.

ignore /_site\/Guardfile/

guard 'livereload' do
  # Watching /.*/ causes a double-reload, the first happening before Jekyll has a chance to
  # update the content, and once again after when it touches .jekyll-metadata. So we watch
  # specifically .jekyll-metadata in order to avoid the redundant reload. It seems like it would
  # be better to watch /_site\/.*/ but for whatever reason I can't get this to work -- livereload
  # never kicks in. :(
  watch /\.jekyll-metadata/
end

guard 'jekyll-plus', :serve => true do
  watch /.*/
  ignore /^_site/
  ignore /\.autosave$/
end
