class EmbeddingsService
  def dump(resource)
    File.write("#{Rails.root}/tmp/#{resource.id}.description.txt", resource.description)
    # File.write("#{Rails.root}/tmp/#{resource.id}.keywords.txt", resource.keywords)
    `python3 ./app/embeddings/embed.py #{resource.id}`
    File.delete("#{Rails.root}/tmp/#{resource.id}.description.txt")
    puts "Dumped embeddings for resource ##{resource.id}"
    # File.delete("#{Rails.root}/tmp/#{resource.id}.keywords.txt")
  end

  def update_embedding(resource)
    File.write("#{Rails.root}/tmp/#{resource.id}.description.txt", resource.description)
    `python3 ./app/embeddings/update.py #{resource.id}`
    File.delete("#{Rails.root}/tmp/#{resource.id}.description.txt")
    puts "Updated embeddings for resource ##{resource.id}"
  end

  def fetch_candidates_for(query)
    output = `python3 ./app/embeddings/encode_query.py #{query.gsub(/[()]/, '')}`
    Resource.where(id: eval(output))
  end
end