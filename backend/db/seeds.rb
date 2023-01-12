if Rails.env.production?
  Doorkeeper::Application.create!(
    name: "React", redirect_uri: "", scopes: "",
    uid: ENV['REACT_APP_CLIENT_ID'],
    secret: ENV['REACT_APP_CLIENT_SECRET']
  )
else
  require 'faker'
  if Resource.all.empty?
    10.times do
      Resource.create!(
        name: Faker::Book.title,
        description: Faker::Lorem.paragraph,
        url: Faker::Internet.url,
        medium: %w[book video course].sample,
        author: Faker::Name.name,
        keywords: %w[spaCy nltk English language pandas].sample(2),
        image_url: Faker::LoremFlickr.image
      )
    end
  end

  if Doorkeeper::Application.count.zero?
    Doorkeeper::Application.create!(name: "Web client", redirect_uri: "", scopes: "")
    Doorkeeper::Application.create!(name: "OS client", redirect_uri: "", scopes: "")
    Doorkeeper::Application.create!(name: "React", redirect_uri: "", scopes: "")
  end
end