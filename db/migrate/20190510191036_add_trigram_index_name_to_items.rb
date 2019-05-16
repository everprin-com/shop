class AddTrigramIndexNameToItems < ActiveRecord::Migration
  def up
    enable_extension(:pg_trgm)
    execute(<<-SQL)
      CREATE INDEX items_on_name_gin_trgm_idx ON items USING GIN(name gin_trgm_ops);
    SQL
  end

  def down
    execute(<<-SQL)
      DROP INDEX items_on_name_gin_trgm_idx;
    SQL
    disable_extension(:pg_trgm)
  end
end
