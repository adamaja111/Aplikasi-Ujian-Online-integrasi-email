import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { ExamClient } from '@/components/exam-client'

// Fisher-Yates Shuffle Algorithm
function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default async function ExamPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const subjectId = parseInt(id)
  
  const cookieStore = await cookies()
  const studentName = cookieStore.get('student_name')?.value

  if (!studentName) {
    redirect('/')
  }

  const subject = await prisma.subject.findUnique({
    where: { id: subjectId },
    include: {
      questions: true,
    },
  })

  if (!subject || subject.questions.length === 0) {
    redirect('/')
  }

  // Shuffle questions for each student/session
  const rawQuestions = shuffle(subject.questions)
  
  const shuffledQuestions = rawQuestions.map((q) => ({
    id: q.id,
    question: q.question,
    options: {
      a: q.option_a,
      b: q.option_b,
      c: q.option_c,
      d: q.option_d,
    },
  }))

  return (
    <div className="min-h-screen bg-gray-50">
      <ExamClient 
        questions={shuffledQuestions} 
        subjectName={subject.subject_name}
        studentName={studentName}
        subjectId={subjectId}
      />
    </div>
  )
}
