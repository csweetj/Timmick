FactoryBot.define do
  factory :user do
    nickname                 { Gimei.name }
    email                    { Faker::Internet.free_email }
    password                 { Faker::Internet.password(min_length: 6, mix_case: false) }
    password_confirmation    { password }
    birthday                 {Faker::Date.between(from: '1999-09-23', to: '2014-09-25')}
    career_id                {2}
    gender_id                {2}

    after(:build) do |user|
      user.avatar.attach(io: File.open('public/images/test_image.png'), filename: 'test_image.png')
    end
  end
end
