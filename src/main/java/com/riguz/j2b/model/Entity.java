package com.riguz.j2b.model;

import java.util.Date;

import com.jfinal.plugin.activerecord.Model;
import com.riguz.j2b.service.IdentityService;

@SuppressWarnings("rawtypes")
public abstract class Entity<M extends Model> extends Model<M> {

    public abstract String getTableName();

    public abstract String getPrimaryKeyName();

    @Override
    public boolean update() {
        this.set("LAST_UPDATED_DATE", new Date());
        return super.update();
    }

    @Override
    public boolean save() {
        String id = IdentityService.getNewId();
        this.set(this.getPrimaryKeyName(), id);
        Date now = new Date();
        this.set("FROM_DATE", now);
        this.set("CREATED_DATE", now);
        return super.save();
    }

    @Override
    public boolean delete() {
        this.set("THUR_DATE", new Date());
        return this.update();
    }
}
