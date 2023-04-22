# frozen_string_literal: true

class Resource < ApplicationRecord
  enum medium: {
    book: 0,
    video: 1,
    course: 2,
    article: 3,
    podcast: 4,
    other: 5
  }, _prefix: true

  validates :name, :medium, presence: true
  validates :name, uniqueness: { scope: %i[author medium] }

  serialize :keywords
  after_initialize do |r|
    r.keywords = [] if r.keywords.nil?
  end

  belongs_to :user
end
