FactoryGirl.define do
  factory :product do
    price  { Faker::Internet.price }
    title  { Faker::Pokemon.title }
    name  { Faker::Name.name }
  end
end