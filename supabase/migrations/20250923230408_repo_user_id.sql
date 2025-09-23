alter table "public"."repo" add column "user_id" uuid not null;

CREATE INDEX repo_user_id_idx ON public.repo USING btree (user_id);


