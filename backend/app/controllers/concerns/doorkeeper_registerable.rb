# frozen_string_literal: true

module DoorkeeperRegisterable
  extend ActiveSupport::Concern

  def generate_refresh_token
    loop do
      token = SecureRandom.hex(32)
      break token unless Doorkeeper::AccessToken.exists? token
    end
  end

  def render_user(user, client_app, token_type = 'Bearer')
    access_token = Doorkeeper::AccessToken
                   .create(resource_owner_id: user.id,
                           application_id: client_app.id,
                           refresh_token: generate_refresh_token,
                           expires_in: Doorkeeper.configuration.access_token_expires_in.to_i,
                           scopes: '')
    {
      access_token: access_token.token,
      token_type:,
      expires_in: access_token.expires_in,
      refresh_token: access_token.refresh_token,
      created_at: user.created_at.iso8601
    }
  end
end
