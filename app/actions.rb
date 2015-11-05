# Homepage (Root path)

get '/' do
  erb :index
end

get '/contacts' do
  @contacts = Contact.all.to_json
end

post '/contacts' do
  @contact = Contact.new
  @contact.firstname=params[:firstname]
  @contact.save
  halt 200, {'Content-Type' => 'application/json'}, @contact.to_json
end

put '/contacts/:id' do
  @contact = Contact.find params[:id]
  @contact[:firstname] = params[:firstname]
  @contact.save
  halt 200, {'Content-Type' => 'application/json'}, @contact.to_json
end

get '/contacts/:id' do
  @contact = Contact.find params[:id]
  halt 200, {'Content-Type' => 'application/json'}, @contact.to_json
end

delete '/contacts/:id' do
  @contact = Contact.find params[:id]
  @contact.delete
end