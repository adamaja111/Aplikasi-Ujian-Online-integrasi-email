import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { cookies } from 'next/headers'
import { resend, ADMIN_EMAIL } from '@/lib/email'

export async function POST(req: Request) {
  try {
    const { subjectId, answers, duration, warningCount } = await req.json()
    const cookieStore = await cookies()
    const studentName = cookieStore.get('student_name')?.value
    const className = cookieStore.get('student_class')?.value

    if (!studentName) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 1. Fetch questions and correct answers
    const questions = await prisma.question.findMany({
      where: { subject_id: subjectId },
    })

    const subject = await prisma.subject.findUnique({
      where: { id: subjectId },
    })

    if (!questions.length || !subject) {
      return NextResponse.json({ error: 'Subject not found' }, { status: 404 })
    }

    // 2. Calculate Score
    let totalCorrect = 0
    questions.forEach((q) => {
      if (answers[q.id] === q.correct_answer) {
        totalCorrect++
      }
    })

    const totalWrong = questions.length - totalCorrect
    const score = Math.round((totalCorrect / questions.length) * 100)

    // 3. Save Student if not exists (or always create new for this session)
    const student = await prisma.student.create({
      data: {
        full_name: studentName,
        class_name: className,
      },
    })

    // 4. Save Exam Result
    const exam = await prisma.exam.create({
      data: {
        student_id: student.id,
        subject_id: subjectId,
        score,
        total_correct: totalCorrect,
        total_wrong: totalWrong,
        duration,
        answers: {
          create: Object.entries(answers).map(([qId, sAns]) => ({
            question_id: parseInt(qId),
            student_answer: sAns as string,
          })),
        },
      },
    })

    // 5. Send Email Notification
    try {
      await resend.emails.send({
        from: 'Ujian Online <onboarding@resend.dev>', // Update with verified domain if available
        to: ADMIN_EMAIL,
        subject: `Hasil Ujian: ${studentName} - ${subject.subject_name}`,
        html: `
          <h1>Hasil Ujian Sekolah Online</h1>
          <p><strong>Nama:</strong> ${studentName}</p>
          <p><strong>Kelas:</strong> ${className || '-'}</p>
          <p><strong>Mata Pelajaran:</strong> ${subject.subject_name}</p>
          <hr />
          <p><strong>Nilai:</strong> ${score}</p>
          <p><strong>Benar:</strong> ${totalCorrect}</p>
          <p><strong>Salah:</strong> ${totalWrong}</p>
          <p><strong>Durasi:</strong> ${Math.floor(duration / 60)} menit ${duration % 60} detik</p>
          <p><strong>Peringatan Kecurangan:</strong> ${warningCount} kali</p>
          <p><strong>Tanggal:</strong> ${new Date().toLocaleString('id-ID')}</p>
        `,
      })
    } catch (emailError) {
      console.error('Failed to send email:', emailError)
      // We don't block the response if email fails
    }

    return NextResponse.json({ examId: exam.id })
  } catch (error) {
    console.error('Submit Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
