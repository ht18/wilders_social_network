<?php

namespace App\Form;

use App\Entity\NewsPost;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class NewsPostType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('Picture')
            ->add('Topic')
            ->add('Content')
            ->add('ContentImg')
            ->add('Likes');
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => NewsPost::class,
        ]);
    }
}
