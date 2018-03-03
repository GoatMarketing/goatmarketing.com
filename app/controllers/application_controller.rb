class ApplicationController < Sinatra::Base
  enable :sessions
  set :session_secret, "password_security"
  register Sinatra::MultiRoute

  use Rack::Auth::Basic do |username, password|
    password == 'goat2k18'
  end

  # Error Handling
  set :show_exceptions, false

  # set folder for templates to ../views, but make the path absolute
  set :views, File.expand_path('../../views', __FILE__)

  # Set public directory
  set :public_folder, File.expand_path('../../../public', __FILE__)

  get '/' do
    erb :index, {locals: {message: @message}}
  end

  get '/about' do
    redirect('/#services')
    # erb :about, {locals: {message: @message}}
  end

  get '/services' do
    redirect('/#services')
    # erb :services, {locals: {message: @message}}
  end

  get '/brands' do
    redirect('/#brands')
    # erb :brands, {locals: {message: @message}}
  end

  get '/creators' do
    redirect('/#creators')
    # erb :creators, {locals: {message: @message}}
  end

  get '/contact' do
    redirect('/#contact')
    # erb :contact, {locals: {message: @message}}
  end

end
