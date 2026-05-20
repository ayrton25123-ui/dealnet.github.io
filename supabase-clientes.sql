create table if not exists public.clientes (
  id bigint generated always as identity primary key,
  nombre text not null,
  email text not null,
  juego text not null,
  mensaje text,
  creado_en timestamptz not null default now()
);

alter table public.clientes enable row level security;

create policy "Permitir insertar clientes desde la web"
on public.clientes
for insert
to anon
with check (
  length(nombre) > 1
  and email like '%@%'
  and juego in ('Minecraft', 'Rust', 'FiveM', 'ARK', 'Otro juego')
);

create policy "Solo usuarios autenticados pueden leer clientes"
on public.clientes
for select
to authenticated
using (true);
