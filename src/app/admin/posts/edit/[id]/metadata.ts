export async function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Yazı Düzenle #${params.id}`,
  };
}
