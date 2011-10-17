require './lib/main-app'
# Rack::Builder.new do
  use Rack::Session::Cookie, :secret => 'whatever'
  use Rack::MethodOverride
  run AppMain
# end
