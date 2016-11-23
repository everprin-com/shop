json.array!(@messages) do |message|
  json.extract! message, :id, :title, :body, :user_id, :user_to
  json.url message_url(message, format: :json)
end
