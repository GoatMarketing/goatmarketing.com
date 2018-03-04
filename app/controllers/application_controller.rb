class ApplicationController < Sinatra::Base
  enable :sessions
  set :session_secret, "password_security"
  register Sinatra::MultiRoute

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

  get '/team' do
    redirect('/#team')
    # erb :team, {locals: {message: @message}}
  end

  get '/creators' do
    redirect('/#creators')
    # erb :creators, {locals: {message: @message}}
  end

  get '/contact' do
    redirect('/#contact')
    # erb :contact, {locals: {message: @message}}
  end

  get '/success' do
    @message = "Your message has been sent!"
    erb :index, {locals: {message: @message}}
  end

  post '/' do
    configure_pony
    name = params[:name]
    sender_email = params[:email]
    message = params[:message]
    logger.error params.inspect
    begin
      Pony.mail(
        :from => "#{name}<#{sender_email}>",
        :to => 'contact@goatmarketing.com',
        :subject =>"#{name} has contacted you from GOAT website",
        :body => "#{message}",
      )
      redirect '/success'
    rescue
      @exception = $!
      erb :boom
    end
  end

  def configure_pony
    Pony.options = {
      :via => :smtp,
      :via_options => {
        :address              => 'smtp.sendgrid.net',
        :port                 => '587',
        :user_name            => ENV['SENDGRID_USERNAME'],
        :password             => ENV['SENDGRID_PASSWORD'],
        :authentication       => :plain,
        :enable_starttls_auto => true,
        :domain               => ENV['SENDGRID_DOMAIN']
      }
    }
  end

end
