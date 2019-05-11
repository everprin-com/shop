namespace :my_namespace do

  task create_telegram_bots: :environment do
    TeleNotify::TelegramUser.create!(telegram_id: -363760774, tg_channel: "question", first_name: "newtrex", username: "newtrex_bot")
    TeleNotify::TelegramUser.create!(telegram_id: -374400962, tg_channel: "order", first_name: "newtrex", username: "newtrex_bot")
  end

end
