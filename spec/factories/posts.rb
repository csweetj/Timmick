FactoryBot.define do
  factory :post do
    title {Faker::Lorem.sentence}
    body {Faker::Lorem.sentence}
    association :user

    after(:build) do |post|
      post.feature_images.attach(io: File.open('public/images/test_image.png'), filename: 'test_image.png')
    end
  end
end
