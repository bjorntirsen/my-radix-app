import { Flex, Text, Card, Inset, Container, Button } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const res = await fetch("https://api.jikan.moe/v4/characters?page=1&limit=6");
  const data = await res.json();
  return data.data.map((char: any) => ({ id: String(char.mal_id) }));
}

async function getCharacter(id: string) {
  const res = await fetch(`https://api.jikan.moe/v4/characters/${id}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.data;
}

export default async function CharacterPage({
  params,
}: {
  params: { id: string };
}) {
  const character = await getCharacter(params.id);
  if (!character) return notFound();

  return (
    <Container size="3" px="4" py="6">
      <Flex direction="row" justify="start" align="center" mb="3">
        <Link href="/">
          <Button size="2" variant="soft" color="gray">
            ← Back
          </Button>
        </Link>
      </Flex>
      <Card size="3" style={{ maxWidth: 800, margin: "0 auto" }}>
        <Flex direction="row" gap="5" align="start" wrap="wrap">
          <Inset
            clip="padding-box"
            side="top"
            pb="current"
            style={{ minWidth: 240 }}
          >
            <img
              src={
                character.images.webp?.image_url ||
                character.images.jpg.image_url
              }
              alt={character.name}
              style={{
                width: "240px",
                height: "240px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          </Inset>
          <Flex direction="column" gap="2" p="2" style={{ flex: 1 }}>
            <Text weight="bold" size="6">
              {character.name}
            </Text>
            {character.name_kanji && (
              <Text size="4" color="gray">
                {character.name_kanji}
              </Text>
            )}
            {character.nicknames?.length > 0 && (
              <Text size="3" color="gray">
                <b>Nicknames:</b> {character.nicknames.join(", ")}
              </Text>
            )}
            <Text size="3" color="gray">
              <b>Favorites:</b> {character.favorites}
            </Text>
            <a
              href={character.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#3b82f6",
                fontSize: "1rem",
                marginTop: "4px",
                textDecoration: "underline",
              }}
            >
              <b>MyAnimeList Page</b>
            </a>
            <Text
              size="3"
              color="gray"
              style={{ whiteSpace: "pre-line", marginTop: "8px" }}
            >
              {character.about || "No description available."}
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Container>
  );
}
