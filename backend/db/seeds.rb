require 'faker'

if Resource.all.empty?
  10.times do
    Resource.create!(
      name: Faker::Book.title,
      description: Faker::Lorem.paragraph,
      url: Faker::Internet.url,
      medium: ['book', 'video', 'course'].sample
    )
  end
end