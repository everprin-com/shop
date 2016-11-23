host "www.everprin.com"

sitemap :site do
  url root_url, last_mod: Time.now, change_freq: "daily", priority: 1.0
  kinds = %w|blog single_page other online_store corporative forum|
  kinds.each do |site|
    url order_sites_path(site),  last_mod: Time.now, change_freq: "daily", priority: 1.0
  end
end




ping_with "http://#{host}/sitemap.xml"