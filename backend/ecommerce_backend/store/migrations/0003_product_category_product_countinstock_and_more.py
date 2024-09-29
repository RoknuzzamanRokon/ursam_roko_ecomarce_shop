from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0002_order_user_marketlist_marketlistitem'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='category',
            field=models.CharField(choices=[('Kachabajar', 'Kachabajar'), ('Home Care', 'Home Care'), ('Frozen Foods', 'Frozen Foods'), ('Dairy', 'Dairy'), ('Fruits', 'Fruits'), ('Snacks', 'Snacks'), ('Tea & Coffee', 'Tea & Coffee'), ('Personal Care', 'Personal Care'), ('Sauce & Pickles', 'Sauce & Pickles')], default=0, max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='product',
            name='countInStock',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='product',
            name='createdAt',
            field=models.DateTimeField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='product',
            name='label',
            field=models.CharField(default='6:53', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='product',
            name='numReviews',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='product',
            name='rating',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=3),
        ),
    ]
