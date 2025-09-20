import Image from "next/image";
import {
  Flex,
  Text,
  Card,
  Inset,
  ThemeProps,
  Theme,
  Heading,
  Button,
} from "@radix-ui/themes";
import Link from "next/link";
import Header from "@/components/header";

type Character = {
  mal_id: number;
  name: string;
  images: {
    jpg: { image_url: string };
    webp: { image_url: string };
  };
  about: string;
};

async function getCharacters(): Promise<Character[]> {
  const res = await fetch(
    "https://api.jikan.moe/v4/characters?page=1&limit=6",
    { cache: "no-store" },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch characters");
  }
  const data = await res.json();
  return data.data;
}

function getAccentColor(index: number): ThemeProps["accentColor"] {
  const accentColors: ThemeProps["accentColor"][] = [
    "gold",
    "bronze",
    "brown",
    "yellow",
    "amber",
    "orange",
    "tomato",
    "red",
    "ruby",
    "crimson",
    "pink",
    "plum",
    "purple",
    "violet",
    "iris",
    "indigo",
    "blue",
    "cyan",
    "teal",
    "jade",
    "green",
    "grass",
    "lime",
    "mint",
    "sky",
  ];
  return accentColors[index % accentColors.length];
}

export default async function Home() {
  const characters = await getCharacters();

  return (
    <div className="flex min-h-screen flex-col bg-[var(--gray-1)]">
      <Header />

      <main className="container mx-auto grow px-4 py-8">
        <Flex wrap="wrap" gap="5" justify="center">
          {characters.map((char, i) => (
            <Theme accentColor={getAccentColor(i)} key={char.mal_id}>
              <Card
                size="3"
                style={{
                  width: 320,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Inset clip="padding-box" side="top" pb="current">
                  <Image
                    src={
                      char.images.webp?.image_url || char.images.jpg.image_url
                    }
                    alt={char.name}
                    width={320}
                    height={256}
                    priority={i === 0}
                    style={{
                      objectFit: "cover",
                      objectPosition: "top",
                      borderRadius: "12px 12px 0 0",
                    }}
                  />
                </Inset>

                <Flex direction="column" gap="2" p="3">
                  <Heading as="h3" size="5">
                    {char.name}
                  </Heading>

                  <Text
                    size="2"
                    color="gray"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {char.about?.replace(/\r?\n|\r/g, " ") ||
                      "No description available."}
                  </Text>

                  <Flex gap="2" mt="3">
                    <Button variant="solid" asChild>
                      <Link href={`/character/${char.mal_id}`}>
                        <span className="ml-1">View Details</span>
                      </Link>
                    </Button>
                  </Flex>
                </Flex>
              </Card>
            </Theme>
          ))}
        </Flex>
      </main>

      <footer className="text-muted-foreground border-t py-4 text-center text-sm">
        © {new Date().getFullYear()} Björn Tirsén. All rights reserved.
      </footer>
    </div>
  );
}
